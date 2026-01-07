"use client";


import "./activityLogsPage.css";


const logs = [
{ user: "James", action: "Added", item: "AC-1001", time: "10:12 AM" },
{ user: "Susan", action: "Edited", item: "AC-1002", time: "09:45 AM" },
{ user: "Susan", action: "Scanned", item: "AC-1003", time: "09:30 AM" },
{ user: "Lisa", action: "Deleted", item: "AC-1004", time: "08:50 AM" }
];


export default function ActivityLogsPage() {
return (
<div className="page-container">
<div className="header-row">
<h2 className="page-title">Activity Logs</h2>
<button className="view-btn">View All Logs</button>
</div>


<table className="logs-table">
<thead>
<tr>
<th>User</th>
<th>Action</th>
<th>Item</th>
<th>Time</th>
</tr>
</thead>
<tbody>
{logs.map((log, index) => (
<tr key={index}>
<td>{log.user}</td>
<td>{log.action}</td>
<td>{log.item}</td>
<td>{log.time}</td>
</tr>
))}
</tbody>
</table>
</div>
);
}