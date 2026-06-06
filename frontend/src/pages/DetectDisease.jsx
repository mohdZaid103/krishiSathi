import { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import axios from "axios";

function DetectDisease() {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleAnalyze = async () => {
    if (!image) {
      alert("Please select an image");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("image", image);

      const response = await axios.post(
        "http://localhost:5000/api/disease/detect",
        formData
      );

      setResult(response.data);
      console.log("Products:", response.data.products);
    } catch (error) {
      console.error(error);
      alert("Analysis failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto px-6 py-10">

        <h1 className="text-4xl font-bold mb-8">
          Detect Plant Disease
        </h1>

        <div className="bg-white p-6 rounded-xl shadow">

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setImage(e.target.files[0])
            }
          />

          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="mt-4 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700"
          >
            {loading ? "Analyzing..." : "Analyze"}
          </button>

        </div>

        {result && (
          <div className="mt-8 bg-white p-6 rounded-xl shadow">

            <h2 className="text-2xl font-bold mb-4">
              Analysis Result
            </h2>

            <p>
              <strong>Disease:</strong>{" "}
              {result.disease}
            </p>

            <p>
              <strong>Severity:</strong>{" "}
              {result.severity}
            </p>

            <div className="mt-4">
              <h3 className="font-bold">
                Symptoms
              </h3>

              <ul className="list-disc ml-6">
                {result.symptoms?.map(
                  (symptom, index) => (
                    <li key={index}>
                      {symptom}
                    </li>
                  )
                )}
              </ul>
            </div>

            <div className="mt-4">
              <h3 className="font-bold">
                Treatment
              </h3>

              <p>{result.treatment}</p>
            </div>

            <div className="mt-4">
              <h3 className="font-bold">
                Recommended Products
              </h3>

              <ul className="list-disc ml-6">
                {result.recommendedProducts?.map(
                  (product, index) => (
                    <li key={index}>
                      {product}
                    </li>
                  )
                )}
              </ul>
            </div>

          </div>
        )}

      </div>
    </MainLayout>
  );
}

export default DetectDisease;