import { Card, Flex, Heading } from "@radix-ui/themes";
import ContributorCard from "./ContributorCard";

const Contributors = () => {
  return (
    <Flex direction={"column"} gap={"3"}>
      <Heading>Contributors by Funds: </Heading>
      <Flex direction="column" gap={"3"}>
        <ContributorCard
          name="Rahul M"
          amt={25000}
          date="2024-05-03"
          img="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.pixabay.com%2Fphoto%2F2023%2F01%2F28%2F20%2F23%2Fai-generated-7751688_640.jpg&f=1&nofb=1&ipt=a92cd3c6443c4eae1cbf331e0dcb0f902d67fbcc3649695473580c403c4a06f0&ipo=images"
        />
        <ContributorCard
          name="Navin Kumaran"
          amt={5000}
          date="2024-04-03"
          img="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdna.artstation.com%2Fp%2Fassets%2Fimages%2Fimages%2F053%2F054%2F138%2Flarge%2Favetetsuya-studios-alien.jpg%3F1661309922&f=1&nofb=1&ipt=ce79c5fe6fb2989b520b4232c56328826ed21774a6f2459a2cd2d0866935f5c4&ipo=images"
        />
        <ContributorCard
          name="Vinoth Kumar"
          amt={15000}
          date="2024-02-03"
          img="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.profilebakery.com%2Fwp-content%2Fuploads%2F2023%2F04%2FLINKEDIN-Profile-Picture-AI.jpg&f=1&nofb=1&ipt=9d9e383d9b781c762368213533e5af8897ce7074f25d45be7e9b3e387346162d&ipo=images"
        />
        <ContributorCard
          name="Agniselvi"
          amt={20000}
          date="2024-01-03"
          img="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F05%2F29%2Fb9%2F0529b93521091b5e4011a97f47ca6113.jpg&f=1&nofb=1&ipt=f369fdbb1a7719f05950ba859c39c2af00bd861f821dd06f414f2fd85af090f8&ipo=images"
        />
      </Flex>
    </Flex>
  );
};

export default Contributors;
