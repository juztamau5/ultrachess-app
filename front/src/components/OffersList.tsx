import { useWeb3React } from "@web3-react/core";
import * as React from "react";

import { formatDate, truncateAddress } from "../ether/utils";
import { BotOffer } from "../state/game/types";
import Address from "./Address";
import AssetDisplay from "./AssetDisplay";
import HandleOffer from "./HandleOffer";
import ModalChallengeBot from "./ModalChallengeBot";
import ModalManageBot from "./ModalManageBot";
import Date from "./ui/Date";
import List from "./ui/List";
import { Text } from "./ui/Text";

const BotOfferListItem = ({
  account,
  offer,
}: {
  account: string;
  offer: BotOffer;
}) => {
  const { offerId, botId, owner, sender, price, token, timestamp } = offer;
  //console.log("offer list item: ")
  //console.log(offer)

  const isOwner = account.toLowerCase() === owner.toLowerCase();

  return (
    <Text>
      <Address value={sender} hoverable={true} /> offered{" "}
      <AssetDisplay balance={price} tokenAddress={token} /> for bot{" "}
      <Address value={botId} hoverable={true} /> at <Date current={timestamp} />
      {isOwner ? (
        <div>
          <HandleOffer offerId={offerId} accept={true} /> or{" "}
          <HandleOffer offerId={offerId} accept={false} />
        </div>
      ) : null}
    </Text>
  );
};

export default ({
  account,
  offers,
}: {
  account: string;
  offers: BotOffer[];
}) => {
  const botItems =
    offers.length > 0
      ? offers.map((offer) => (
          <BotOfferListItem account={account} offer={offer} />
        ))
      : [<Text key={0}>No offers found</Text>];

  return <List items={botItems} />;
};
