import { AreaChart } from "@tremor/react";
import { useSelector } from "react-redux";

const dataFormatter = (number) =>
  `$${Intl.NumberFormat("us").format(number).toString()}`;

const Charts = () => {
  const { sales, purchases } = useSelector((state) => state.stock);

  const salesData = sales?.map((item) => ({
    date: new Date(item.createdAt).toLocaleDateString("tr-TR"),
    amount: item.amount,
  }));

  const purchasesData = purchases?.map((item) => ({
    date: new Date(item.createdAt).toLocaleDateString("tr-TR"),
    amount: item.amount,
  }));
  console.log(salesData);
  return (
    <div className="flex w-full flex-row items-center justify-center gap-10 mt-14 ">
      <AreaChart
        className="h-80 w-1/2 border-2 border-gray-400 rounded-lg "
        data={salesData}
        index="date"
        categories={["amount"]}
        colors={["indigo"]}
        valueFormatter={dataFormatter}
        yAxisWidth={60}
      />

      <AreaChart
        className="h-80 w-1/2 border-2 border-gray-400 rounded-lg"
        data={purchasesData}
        index="date"
        categories={["amount"]}
        colors={["red"]}
        valueFormatter={dataFormatter}
        yAxisWidth={60}
      />
    </div>
  );
};
export default Charts;
