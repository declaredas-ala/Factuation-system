import React, { useEffect, useState } from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Header, StatBox } from "../../components";
import {
  Receipt,
  Description,
  Person,
  Business,
  LocalMall,
  CheckCircle,
  Cancel,
  HourglassEmpty,
} from "@mui/icons-material";
import { tokens } from "../../theme";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function Dashboard() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isXlDevices = useMediaQuery("(min-width: 1260px)");
  const isMdDevices = useMediaQuery("(min-width: 724px)");
  const isXsDevices = useMediaQuery("(max-width: 436px)");

  const [facturesCount, setFacturesCount] = useState(0);
  const [devisCount, setDevisCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);
  const [clientsCount, setClientsCount] = useState(0);
  const [productsCount, setProductsCount] = useState(0);
  const [paidCount, setPaidCount] = useState(0);
  const [cancelledCount, setCancelledCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [factures, devis, users, clients, products] = await Promise.all([
          axios.get("http://localhost:5000/api/factures", {
            withCredentials: true,
          }),
          axios.get("http://localhost:5000/api/devis", {
            withCredentials: true,
          }),
          axios.get("http://localhost:5000/api/users", {
            withCredentials: true,
          }),
          axios.get("http://localhost:5000/api/clients", {
            withCredentials: true,
          }),
          axios.get("http://localhost:5000/api/produits", {
            withCredentials: true,
          }),
        ]);

        setFacturesCount(factures.data.length);
        setDevisCount(devis.data.length);
        setUsersCount(users.data.length);
        setClientsCount(clients.data.length);
        setProductsCount(products.data.length);

        const paid = factures.data.filter(
          (facture) => facture.status === "paid"
        ).length;
        const cancelled = factures.data.filter(
          (facture) => facture.status === "cancelled"
        ).length;
        const pending = factures.data.filter(
          (facture) => facture.status === "pending"
        ).length;

        setPaidCount(paid);
        setCancelledCount(cancelled);
        setPendingCount(pending);
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };

    fetchCounts();
  }, []);

  const data = [
    {
      name: "Paid",
      count: paidCount,
    },
    {
      name: "Cancelled",
      count: cancelledCount,
    },
    {
      name: "Pending",
      count: pendingCount,
    },
  ];

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between">
        <Header
          title="DASHBOARD"
          subtitle="Bienvenue sur votre tableau de bord"
        />
      </Box>

      <Box
        display="grid"
        gridTemplateColumns={
          isXlDevices
            ? "repeat(12, 1fr)"
            : isMdDevices
            ? "repeat(6, 1fr)"
            : "repeat(3, 1fr)"
        }
        gridAutoRows="140px"
        gap="20px"
      >
        <Box
          gridColumn="span 3"
          backgroundColor={"#FCFCFC"}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={`${facturesCount}`}
            subtitle="Total Factures"
            icon={
              <Receipt
                sx={{ color: colors.greenAccent[300], fontSize: "26px" }}
              />
            }
          />
        </Box>

        <Box
          gridColumn="span 3"
          backgroundColor={"#FCFCFC"}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={`${devisCount}`}
            subtitle="Total Devis"
            icon={
              <Description
                sx={{ color: colors.greenAccent[300], fontSize: "26px" }}
              />
            }
          />
        </Box>

        <Box
          gridColumn="span 3"
          backgroundColor={"#FCFCFC"}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={`${usersCount}`}
            subtitle="Total Users"
            icon={
              <Person
                sx={{ color: colors.greenAccent[300], fontSize: "26px" }}
              />
            }
          />
        </Box>

        <Box
          gridColumn="span 3"
          backgroundColor={"#FCFCFC"}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={`${clientsCount}`}
            subtitle="Total Clients"
            icon={
              <Business
                sx={{ color: colors.greenAccent[300], fontSize: "26px" }}
              />
            }
          />
        </Box>

        <Box
          gridColumn="span 3"
          backgroundColor={"#FCFCFC"}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={`${productsCount}`}
            subtitle="Total Products"
            icon={
              <LocalMall
                sx={{ color: colors.greenAccent[300], fontSize: "26px" }}
              />
            }
          />
        </Box>

        <Box
          gridColumn="span 3"
          backgroundColor={"#FCFCFC"}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={`${paidCount}`}
            subtitle="Paid Invoices"
            icon={
              <CheckCircle
                sx={{ color: colors.greenAccent[300], fontSize: "26px" }}
              />
            }
          />
        </Box>

        <Box
          gridColumn="span 3"
          backgroundColor={"#FCFCFC"}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={`${cancelledCount}`}
            subtitle="Cancelled Invoices"
            icon={
              <Cancel
                sx={{ color: colors.greenAccent[300], fontSize: "26px" }}
              />
            }
          />
        </Box>

        <Box
          gridColumn="span 3"
          backgroundColor={"#FCFCFC"}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={`${pendingCount}`}
            subtitle="Pending Invoices"
            icon={
              <HourglassEmpty
                sx={{ color: colors.greenAccent[300], fontSize: "26px" }}
              />
            }
          />
        </Box>
      </Box>

      <Box mt="20px" p="20px" backgroundColor={"#FCFCFC"} borderRadius="8px">
        <Typography variant="h6" gutterBottom>
          Invoice Status Overview
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 20,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="name" stroke="#666" />
            <YAxis stroke="#666" />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#f8863e" barSize={30} />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
}

export default Dashboard;
