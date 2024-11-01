import { Editor } from "@tinymce/tinymce-react";
import PropTypes from "prop-types";

const apiKey = import.meta.env.VITE_TINY_API_KEY;

export default function Textarea({
  label,
  name,
  value,
  onChange,
  error = false,
  errorMessage = "",
  height = 500,
}) {
  return (
    <div>
      <label
        style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
      >
        {label}
      </label>
      <div
        style={{
          border: error ? "2px solid red" : "1px solid #ccc",
          borderRadius: "4px",
        }}
      >
        <Editor
          apiKey={apiKey}
          value={value} // Controlled value
          init={{
            height,
            plugins:
              "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",
            toolbar:
              "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
            content_style: error
              ? "body { background-color: #ffe6e6; }"
              : "body { background-color: white; }",
          }}
          onEditorChange={
            (content) => onChange({ target: { name, value: content } }) // Pass the content as the value
          }
        />
      </div>

      {error && (
        <p style={{ color: "red", marginTop: "8px", fontSize: "12px" }}>
          {errorMessage}
        </p>
      )}
    </div>
  );
}

// Prop types validation
Textarea.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  height: PropTypes.number,
};
