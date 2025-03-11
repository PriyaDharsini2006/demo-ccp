import { Button, Flex, Grid, Heading } from "@radix-ui/themes";
import React from "react";
import TeamCard from "./TeamCard";

const Team = ({ editor }: { editor: boolean }) => {
  return (
    <Flex direction={"column"} gap={"3"}>
      <Heading>Meet the team: </Heading>
      <Flex direction="column" gap={"3"}>
        <Grid columns={"2"} gap={"3"} rows={"2"}>
          <TeamCard
            img="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpng.pngtree.com%2Fpng-clipart%2F20230927%2Foriginal%2Fpngtree-man-avatar-image-for-profile-png-image_13001882.png&f=1&nofb=1&ipt=ec5f69e9ebf54e2fc51fa26dfaea0ba8d1a6f2d615a072239664343a561b5930&ipo=images"
            name="Balaji P N"
            role="Full Stack Developer"
          />
          <TeamCard
            img="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.dribbble.com%2Fusers%2F5534%2Fscreenshots%2F14230133%2Fprofile_4x.jpg&f=1&nofb=1&ipt=1f4f6e893bb6974389b3bfe8b9949df6a17f7a0fd3e20767371c309857e1b2c2&ipo=images"
            name="Mohammed Shihab"
            role="Game Developer"
          />
          <TeamCard
            img="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.dribbble.com%2Fusers%2F1902890%2Fscreenshots%2F18344642%2Fmains_artboard_1_copy_8_4x.png&f=1&nofb=1&ipt=08764f39b62a9cfbd7df153e769ec608ce58906a7afe73f6ce30b9f264a52748&ipo=images"
            name="Nitheeshlingam"
            role="App Developer"
          />
          <TeamCard
            img="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F011%2F675%2F374%2Foriginal%2Fman-avatar-image-for-profile-png.png&f=1&nofb=1&ipt=e00c1dc7ee0be1d3367cc9dfc233682ed7e9d679886aa77ce8a07811b41a1253&ipo=images"
            name="Yashonandhan"
            role="Web Developer"
          />
        </Grid>
        {editor && <Button variant="soft">Edit Team</Button>}
      </Flex>
    </Flex>
  );
};

export default Team;
