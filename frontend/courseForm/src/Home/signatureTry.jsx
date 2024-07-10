import { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';

const SignatureApp = () => {
  const sigCanvas = useRef(null);
  const [signed, setSigned] = useState(false);
  const [signature, setSignature] = useState(null);

  const clearSignature = () => {
      console.log("sigCanvas.current = " , sigCanvas.current)
    if (sigCanvas.current) {
      sigCanvas.current.clear();
      setSigned(false);
      setSignature(null);
    } else {
      console.error("Signature Canvas reference not found!");
    }
  };
  

  const saveSignature = () => {
    if (!signed) return;
    const img = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png');
    setSignature(img);
  };

  return (
    <div className="signature-box">
      <h2>Sign Here</h2>
      <SignatureCanvas
        ref={sigCanvas}
        penColor="black"
        canvasProps={{ width: 500, height: 200, className: 'signature-pad' }}
        onEnd={() => setSigned(true)}
      />
      <div className="signature-actions">
        <button onClick={()=>clearSignature()} disabled={!signed}>Clear</button>
        <button onClick={()=>saveSignature()} disabled={!signed}>Save</button>
      </div>
      {signature && <img src={signature} alt="Signature" />}
    </div>
  );
};

export default SignatureApp;



// import { useState, useRef } from "react";
// import Popup from "reactjs-popup";
// import SignaturePad from "react-signature-canvas";
// // import "./App.css";
// import "./sigCanvas.css";

// function SignatureApp() {
//   const [imageURL, setImageURL] = useState(null); // create a state that will contain our image url

//   const sigCanvas = useRef({});

//   /* a function that uses the canvas ref to clear the canvas 
//   via a method given by react-signature-canvas */
//   const clear = () => sigCanvas.current.clear();

//   /* a function that uses the canvas ref to trim the canvas 
//   from white spaces via a method given by react-signature-canvas
//   then saves it in our state */
//   const save = () =>
//     setImageURL(sigCanvas.current.getTrimmedCanvas().toDataURL("image/png"));

//   return (
//     <div className="App">
//       <h1>Signature Pad Example</h1>
//       <Popup
//         modal
//         trigger={<button>Open Signature Pad</button>}
//         closeOnDocumentClick={false}
//       >
//         {close => (
//           <>
//             <SignaturePad
//               ref={sigCanvas}
//               canvasProps={{
//                 className: "signatureCanvas"
//               }}
//             />
//             {/* Button to trigger save canvas image */}
//             <button onClick={save}>Save</button>
//             <button onClick={clear}>Clear</button>
//             <button onClick={close}>Close</button>
//           </>
//         )}
//       </Popup>
//       <br />
//       <br />
//       {/* if our we have a non-null image url we should 
//       show an image and pass our imageURL state to it*/}
//       {imageURL ? (
//         <img
//           src={imageURL}
//           alt="my signature"
//           style={{
//             display: "block",
//             margin: "0",
//             border: "1px solid black",
//             width: "150px"
//           }}
//         />
//       ) : null}
//     </div>
//   );
// }

// export default SignatureApp;
