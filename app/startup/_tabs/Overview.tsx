import { Flex, Grid, Heading } from "@radix-ui/themes";
import { CiUser } from "react-icons/ci";
import {
  PiProjectorScreenBold,
  PiProjectorScreenChartLight,
} from "react-icons/pi";
import EditOverview from "./EditOverview";
import OverviewCard from "./OverviewCard";
import prisma from "@/prisma/client";

const Overview = async ({ id, editor }: { id: string; editor: boolean }) => {
  const over = await prisma.overview.findUnique({ where: { startupId: id } });
  // const handleEdit = async ({
  //   emp,
  //   curProj,
  //   prevProj,
  //   fundsRaise,
  // }: {
  //   emp: number;
  //   curProj: number;
  //   prevProj: number;
  //   fundsRaise: number;
  // }) => {
  //   const over = await prisma.overview
  //     .create({
  //       data: {
  //         noOfEmployees: emp,
  //         currentProjects: curProj,
  //         prevProjects: prevProj,
  //         fundsRaised: fundsRaise,
  //         startupId: id,
  //       },
  //     })
  //     .catch((e) => console.log(e));
  // };
  return (
    <Flex direction={"column"} gap={"3"}>
      <Heading>Company Essential Details</Heading>
      {/* {!over && <EditOverview />} */}
      <Flex direction="column" gap={"3"}>
        <Grid columns={"2"} gap={"3"} rows={"2"}>
          <OverviewCard text="Number of Employees" count="432" Icon={CiUser} />
          <OverviewCard
            text="Current Project"
            count="142"
            Icon={PiProjectorScreenChartLight}
          />
          <OverviewCard
            text="Previous Projects"
            count="337"
            Icon={PiProjectorScreenBold}
          />
          <OverviewCard text="Funds Raised" count="432" Icon={CiUser} />
        </Grid>
        {editor && <EditOverview />}
      </Flex>
    </Flex>
  );
};

export default Overview;
