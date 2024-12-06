import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

interface ReviewProps {
  handleSubmit: (values: { rating: number; komentar: string }) => void;
}

const ReviewSchema = Yup.object().shape({
  rating: Yup.number().min(1, "Rating minimal 1").required("Rating diperlukan"),
  komentar: Yup.string().required("Komentar diperlukan"),
});

const Review: React.FC<ReviewProps> = ({ handleSubmit }) => {
  return (
    <Formik
      initialValues={{ rating: 0, komentar: "" }}
      validationSchema={ReviewSchema}
      onSubmit={(values) => handleSubmit(values)}
    >
      {({ setFieldValue, values }) => (
        <Form>
          <div className="mb-4">
            <p className="mb-2">Rating:</p>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  className={`text-2xl ${
                    star <= values.rating ? "text-yellow-500" : "text-gray-300"
                  }`}
                  onClick={() => setFieldValue("rating", star)}
                >
                  ★
                </button>
              ))}
            </div>
            <ErrorMessage
              name="rating"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="komentar" className="block mb-2">
              Komentar:
            </label>
            <Field
              as="textarea"
              id="komentar"
              name="komentar"
              className="w-full p-2 border rounded focus:outline-none focus:border-green-500 focus:border-2"
              rows={4}
            />
            <ErrorMessage
              name="komentar"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="submit"
              className="flex justify-end font-semibold text-white bg-[#089562] hover:bg-green-800 rounded text-sm px-3 py-1.5 me-2 dark:bg-green-600 dark:hover:bg-green-700"
            >
              Kirim
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Review;
