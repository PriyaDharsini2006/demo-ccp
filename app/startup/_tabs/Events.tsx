import { Button, Flex, Heading } from "@radix-ui/themes";
import React from "react";
import EventCard from "./EventCard";

const Events = ({ editor }: { editor: boolean }) => {
  return (
    <Flex direction={"column"} gap={"3"}>
      <Heading>Events in the Company: </Heading>
      <Flex direction="column" gap={"3"}>
        <EventCard
          img="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F016%2F712%2F564%2Foriginal%2F3d-render-illustration-of-project-management-analysis-result-icon-png.png&f=1&nofb=1&ipt=ad7832c52d4c9932f3b543bfb78a0621c9b417f205d35e92f43f5e2c6b7e2e33&ipo=images"
          title="Hackathon"
          description="Learn by Doing"
          place="madurai"
          time={"07.00 pm"}
        />
        <EventCard
          img="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.pmmajik.com%2Fwp-content%2Fuploads%2F2014%2F10%2Fproject_review.png&f=1&nofb=1&ipt=2d75ee1e041d316230a3172f4bb5a6d042bea7c0fd438290417bba88c134b453&ipo=images"
          title="Project Review"
          description="Review the ongoing Projects"
          place="kovai"
          time={"03.00 pm"}
        />
        <EventCard
          img="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F003%2F031%2F469%2Foriginal%2F10-years-anniversary-banner-template-vector.jpg&f=1&nofb=1&ipt=28e15b7e3762ed0e5acb3fdc42c374ee1b4a7df45d8bd93155dbed2fb1b1830f&ipo=images"
          title="10 Year Anniversary"
          description="Celebration of 10th Year Anniversary"
          place="chennai"
          time={"12.00 am"}
        />
        <EventCard
          img="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.prismic.io%2Fadamdotai-website-v4%2F71f1a466-a610-4560-b66b-6abdd7d4974b_Board%2520meeting-1%2520(1).png%3Fixlib%3DgatsbyFP%26auto%3Dcompress%252Cformat%26fit%3Dmax%26q%3D50%26w%3D1350%26h%3D900&f=1&nofb=1&ipt=b2b9c560bd1e95e567d2e44327769065b47d6497add7d6449b5ca60770927d3f&ipo=images"
          title="Board Meet"
          description="Meet for the future plans"
          place="bangalore"
          time={"04.00 pm"}
        />
        {editor && <Button variant="soft">Add new Events</Button>}
      </Flex>
    </Flex>
  );
};

export default Events;
