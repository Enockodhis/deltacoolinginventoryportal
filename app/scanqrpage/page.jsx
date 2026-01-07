"use client";


import { useState } from "react";
import "./scanQRPage.css";


export default function ScanQRPage() {
const [scanning, setScanning] = useState(false);


return (
<div className="page-container">
<h2 className="page-title">Scan QR Code</h2>
<p className="page-subtitle">
Scan a QR code on product boxes to view item details instantly.
</p>


<div className="qr-box">
<div className="qr-frame">
<div className="qr-placeholder">QR</div>
</div>
</div>


<button className="cancel-btn" onClick={() => setScanning(false)}>
Cancel
</button>
</div>
);
}