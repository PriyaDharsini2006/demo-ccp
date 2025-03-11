import {
  Badge,
  Card,
  DataList,
  Heading,
  Separator,
  Text,
  TextArea,
} from "@radix-ui/themes";
import ImageComp from "./ImageComp";

const InfoBar = ({ startup }: { startup: any }) => {
  return (
    <>
      <ImageComp id={startup.id} url={startup.imageURL} />
      <Card>
        <DataList.Root className="rounded-md">
          <DataList.Item align={"center"}>
            <DataList.Label color="grass">Name</DataList.Label>
            <DataList.Value>
              <Heading>{startup.name}</Heading>
            </DataList.Value>
          </DataList.Item>
          <SeparatorCustom />
          <DataList.Item align={"center"}>
            <DataList.Label color="grass">Domain:</DataList.Label>
            <DataList.Value>
              <Badge variant="outline" radius="full" color="cyan">
                {startup.domain || "NA"}
              </Badge>
            </DataList.Value>
          </DataList.Item>
          <SeparatorCustom />
          <DataList.Item align={"center"}>
            <DataList.Label color="grass">Description</DataList.Label>
            <DataList.Value>
              <Text>{startup.description}</Text>
            </DataList.Value>
          </DataList.Item>
          <SeparatorCustom />
          <DataList.Item align={"center"}>
            <DataList.Label color="grass">Software Type</DataList.Label>
            <DataList.Value>
              <Badge color="cyan" radius="full" variant="outline">
                {startup.type}
              </Badge>
            </DataList.Value>
          </DataList.Item>
          <SeparatorCustom />
          <DataList.Item align={"center"}>
            <DataList.Label color="grass">Vision:</DataList.Label>
            <DataList.Value>{startup.vision || "NA"}</DataList.Value>
          </DataList.Item>
          <SeparatorCustom />
          <DataList.Item align={"center"}>
            <DataList.Label color="grass">Mission:</DataList.Label>
            <DataList.Value>{startup.mission || "NA"}</DataList.Value>
          </DataList.Item>
        </DataList.Root>
      </Card>
    </>
  );
};

export default InfoBar;

export const SeparatorCustom = () => {
  return (
    <DataList.Item>
      <Separator size={"4"} />
      <Separator size={"4"} />
    </DataList.Item>
  );
};
