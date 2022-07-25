import Toast from "react-bootstrap/Toast";

function BasicExample({ handleAlert }) {
  return (
    <Toast onClose={handleAlert}>
      <Toast.Header>
        <strong className="me-auto">Warning</strong>
      </Toast.Header>
      <Toast.Body>Semua Kolom harus diisi.</Toast.Body>
    </Toast>
  );
}

export default BasicExample;
