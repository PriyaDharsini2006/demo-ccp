"use client";

import { Card, Flex, Heading } from "@radix-ui/themes";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const Performance = ({ invoices }: { invoices: any[] }) => {
  // Sort invoices by date before mapping
  const sortedInvoices = invoices.sort(
    (a, b) => new Date(a.retPeriod).getTime() - new Date(b.retPeriod).getTime()
  );

  // Transform invoices data into the format required by Recharts
  const chartData = sortedInvoices.map((invoice: any) => ({
    year: formatDate(new Date(invoice.retPeriod)), // Convert date to string
    turnover: invoice.totalValue,
    profit: invoice.profit || 0,
  }));

  return (
    <Card>
      <Heading size="4" className="text-gray-900 dark:text-gray-100 mb-4">
        Performance Overview
      </Heading>
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={chartData} className="p-2 text-black">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area
            type="monotone"
            dataKey="turnover"
            stroke="#8884d8"
            fill="url(#turnoverGradient)"
            name="Turnover"
          />
          <Area
            type="monotone"
            dataKey="profit"
            stroke="#82ca9d"
            fill="url(#profitGradient)"
            name="Profit"
          />
          <defs>
            <linearGradient id="turnoverGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
};

const formatDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
  };
  return date.toLocaleDateString(undefined, options);
};

export default Performance;
