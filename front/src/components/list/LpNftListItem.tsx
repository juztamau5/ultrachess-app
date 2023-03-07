// React component that takes in LpNftProfile and renders it with multiple
// Flex components

import { LpNftProfile } from "../../state/game/types";
import Address from "../Address";
import Flex from "../ui/Flex";
import { Text } from "../ui/Text";

export default ({ lpNft }: { lpNft: LpNftProfile }) => {
  const { tokenId, name, description, imageUri } = lpNft;

  return (
    <Flex css={{ gap: 5, justifyContent: "space-between" }}>
      <Flex css={{ flexDirection: "column", gap: 2 }}>
        <Text faded>Token ID</Text>
        <Text>{tokenId.toString()}</Text>
      </Flex>
      <Flex css={{ flexDirection: "column", gap: 2 }}>
        <Text faded>Name</Text>
        <Text>{name}</Text>
      </Flex>
      <Flex css={{ flexDirection: "column", gap: 2 }}>
        <Text faded>URI</Text>
        <img src={imageUri}></img>
      </Flex>
    </Flex>
  );
};
