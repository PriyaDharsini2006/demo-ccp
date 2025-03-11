import { Card, Tabs } from "@radix-ui/themes";
import Overview from "./_tabs/Overview";
import Team from "./_tabs/Team";
import Contributors from "./_tabs/Contributors";
import Events from "./_tabs/Events";
import { getServerSession } from "next-auth";

const Essentials = async ({ id }: { id: string }) => {
  const session = await getServerSession();
  return (
    <Card className="my-4">
      <Tabs.Root defaultValue="overview">
        <Tabs.List>
          <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
          <Tabs.Trigger value="team">Team</Tabs.Trigger>
          <Tabs.Trigger value="contributors">
            Previous Contributors
          </Tabs.Trigger>
          <Tabs.Trigger value="events">Events</Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="overview" className="p-4">
          <Overview id={id} editor={session ? true : false} />
        </Tabs.Content>
        <Tabs.Content value="team" className="p-4">
          <Team editor={session ? true : false} />
        </Tabs.Content>
        <Tabs.Content value="contributors" className="p-4">
          <Contributors />
        </Tabs.Content>
        <Tabs.Content value="events" className="p-4">
          <Events editor={session ? true : false} />
        </Tabs.Content>
      </Tabs.Root>
    </Card>
  );
};

export default Essentials;
