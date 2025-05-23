export default function MessageBox() {
  return (
    <div className="MessageBox">
      <div>
        <p>
          <b>All your Progress will get lost.</b>
          <br>Download the current progress to save it.</br>
          Press <b>Ok</b> to create a new document.
        </p>
        <div className="MessageBoxButtons">
          <div>
            <button>Ok</button>
            <button>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}
