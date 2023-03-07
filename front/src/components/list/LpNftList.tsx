import { LpNftProfile } from "../../state/game/types";
import List from "../ui/List";
import { Text } from "../ui/Text";
import LpNftListItem from "./LpNftListItem";

export default ({ lpNfts }: { lpNfts: LpNftProfile[] }) => {
  const lpNftItems =
    lpNfts.length > 0
      ? lpNfts.map((lpNft) => <LpNftListItem lpNft={lpNft} />)
      : [<Text key={0}>No LP NFTs found</Text>];

  return <List items={lpNftItems} />;
};
