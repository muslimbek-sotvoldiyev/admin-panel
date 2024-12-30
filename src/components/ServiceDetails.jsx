import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ServiceDetails() {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://doctorhelper.pythonanywhere.com/api/v1/service/${id}/`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setService(data); 
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen pt-24">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500 pt-24">
        Error: {error}
      </div>
    );
  }

  if (!service) {
    return (
      <div className="flex items-center justify-center min-h-screen pt-24">
        No service details available
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <h1 className="text-3xl font-bold mb-8 text-center">
        {service.type?.name}
      </h1>

      {/* Service Type Icon */}
      {service.type?.icon && (
        <div className="mb-8 flex justify-center">
          <img
            src={service.type.icon}
            alt="Service Type Icon"
            className="w-16 h-16 object-contain"
          />
        </div>
      )}

      {/* Doctors Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Doctors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {service.doctors?.map((doctor) => (
            <div key={doctor.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-4">
                {doctor.image && (
                  <img
                    src={doctor.image}
                    alt={`${doctor.first_name} ${doctor.last_name}`}
                    className="w-24 h-24 rounded-full object-cover"
                  />
                )}
                <div>
                  <h3 className="font-semibold text-lg">
                    {doctor.first_name} {doctor.last_name}
                  </h3>
                  <p className="text-gray-600">
                    Phone: {doctor.phone || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Clinic Information */}
      {service.clinic && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Clinic Information</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  {service.clinic.name}
                </h3>
                <div className="space-y-2">
                  <p className="text-gray-600">
                    Rating: ⭐ {service.clinic.rate || "N/A"}
                  </p>
                  <p className="text-gray-600">
                    Opening Time: {service.clinic.opening_time || "N/A"}
                  </p>
                  <p className="text-gray-600">
                    Closing Time: {service.clinic.closing_time || "N/A"}
                  </p>
                  {service.clinic.latitude && service.clinic.longitude && (
                    <p className="text-gray-600">
                      Location: {service.clinic.latitude},{" "}
                      {service.clinic.longitude}
                    </p>
                  )}
                </div>
              </div>
              {service.clinic.images?.[0] && (
                <div>
                  <img
                    src={service.clinic.images[0].image}
                    alt={service.clinic.name}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
