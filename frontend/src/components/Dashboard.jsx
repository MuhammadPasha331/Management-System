import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer
} from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658'];

const Dashboard = () => {
  const theme = useTheme(); // ✅ use MUI theme here

  const [overview, setOverview] = useState(null);
  const [trends, setTrends] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      try {
        const overviewRes = await axios.get('http://localhost:5000/api/analytics/overview', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const trendsRes = await axios.get('http://localhost:5000/api/analytics/trends', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setOverview(overviewRes.data);
        setTrends(trendsRes.data.trends);
      } catch (err) {
        console.error('Error fetching analytics:', err);
      }
    };

    fetchData();
  }, []);

  const formatTrendData = () => {
    const formatted = {};
    trends.forEach(item => {
      const date = `${item._id.year}-${item._id.month}-${item._id.day}`;
      if (!formatted[date]) formatted[date] = { date };
      formatted[date][item._id.status] = item.count;
    });
    return Object.values(formatted);
  };

  return (
    <div className="dashboard-container">
      <h2>Analytics Dashboard</h2>

      {overview ? (
        <>
          <div className="summary">
            <p>Total Tasks: {overview.totalTasks}</p>
            <p>Completed: {overview.completedTasks}</p>
            <p>Pending: {overview.pendingTasks}</p>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart style={{ backgroundColor: theme.palette.mode === 'dark' ? '#fff0f0ff' : '#ffffff'}}>
              <Pie
                data={overview.statusBreakdown.map(s => ({ name: s._id, value: s.count }))}
                cx="50%" cy="50%" outerRadius={100}
                label
              >
                {overview.statusBreakdown.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <h3>Task Trends</h3>
          <ResponsiveContainer width="100%" height={300} style={{ backgroundColor: theme.palette.mode === 'dark' ? '#fff0f0ff' : '#ffffff' }}>
            <BarChart data={formatTrendData()} >
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="Pending" stackId="a" fill="#f9c74f" />
              <Bar dataKey="In Progress" stackId="a" fill="#6fbb35ff" />
              <Bar dataKey="Completed" stackId="a" fill="#0cd196ff" />
            </BarChart>
          </ResponsiveContainer>
        </>
      ) : (
        <p>Loading analytics...</p>
      )}
    </div>
  );
};

export default Dashboard;
