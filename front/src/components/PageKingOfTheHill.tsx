import * as React from "react";
import BotUploader from "./BotUploader";
import { useSelector } from "react-redux";
import BotListView from "./list/BotList";
import BotGameCreator from "./BotGameCreator";
import { useAllTournaments, useThrone } from "../state/game/hooks";
import Flex from "./ui/Flex";
import { Text } from "./ui/Text";
import { styled } from "@stitches/react";
import ModalCreateBot from "./modals/ModalCreateBot";
import Separator from "./ui/Separator";
import { ZoomOutIcon, StitchesLogoIcon } from "@radix-ui/react-icons";
import Button from "./ui/Button";
import { violet } from "@radix-ui/colors";
import ProfileList from "./list/ProfileList";
import ModalCreateTournament from "./modals/ModalCreateTournament";
import TournamentList from "./list/TournamentList";
import ModalThroneChallenge from "./modals/ModalThroneChallenge";
import { useWeb3React } from "@web3-react/core";
import ModalThroneUpdate from "./modals/ModalThroneUpdate";
import { ThroneBattle } from "../state/game/types";
import Address from "./Address";
import AddressGame from "./AddressGame";
import AssetDisplay from "./AssetDisplay";
import { USDC_ADDRESS_ON_NETWORKS } from "../ether/chains";
import { useTokenFromList, useTokenPortalBalance, useTokenBalance } from '../hooks/token';
import List from "./ui/List";
import { truncateAddress } from "../ether/utils";
    


const battleListItem = (maxTrys: number, gamesToWin:number, battle: ThroneBattle) => {
    return (
        <Flex css={{ justifyContent: "space-evenly", width: '800px'}}>
            <Flex css={{ flexDirection: "column", gap: 5 }}>
                <Text bold>challenger</Text>
                <Address value={battle.challenger} />
            </Flex>
            <Flex css={{ flexDirection: "column", gap: 5 }}>
                <Text bold>Wins</Text>
                <Text green>{battle.wins}</Text>
            </Flex>
            <Flex css={{ flexDirection: "column", gap: 5 }}>
                <Text bold>Trys left</Text>
                <Text black>{maxTrys - battle.completed_games}</Text>
            </Flex>
            <Flex css={{ flexDirection: "column", gap: 5 }}>
                <Text bold>Games</Text>
                <Flex css={{ gap: 5, flexDirection: "column" }}>
                    {battle.games.map((game) => (
                        <AddressGame id={game} />
                    ))}
                </Flex>
            </Flex>
            <Flex css={{ flexDirection: "column", gap: 5 }}>
                <Text bold>Status </Text>
                <Text green>{battle.completed_games >= maxTrys ? "lost" : battle.wins >= gamesToWin ? "won, became king" : "ongoing"}</Text>
            </Flex>
        </Flex>
    )
}
                                


export default () => {
    const { account, chainId } = useWeb3React()
    const {
        king,
        maxTrys,
        gamesToWin,
        winnings,
        battles,
        price
    } = useThrone()

    const isKing = account?.toLowerCase() === king?.toLowerCase()

    const token = useTokenFromList(USDC_ADDRESS_ON_NETWORKS[chainId]);

    const battleItems = 
        Object.values(battles).length > 0 ?
        Object.values(battles).map((battle) => battleListItem(maxTrys, gamesToWin, battle)) :
        [<Text black size={2} css={{width:"800px", textAlign:"left", lineHeight:"30px", marginBottom:"-80px"}}>
            No challenges yet
        </Text>]

    

    return (
        <div className="body">
        <div className="header">
            <div>
            <Text bold black size={"max"} css={{ textAlign: "center", marginBottom: "10px" }}>
                King of the Hill
            </Text>
            </div>
            <Text black size={2} css={{width:"100%", textAlign:"left", lineHeight:"30px", marginBottom:"-80px"}}>
                This is the king of the hill mode. For a price, opponents of any kind can challenge the king to claim the throne.
                The king can set the price and the number of games to win. The king can also set the number of tries an opponent has to win.
                Current king: {truncateAddress(king)}  has {Object.keys(battles).length} open challenges
                and has won {winnings} {token?.symbol} in total.
            </Text>
        </div>
        <div className="content">
            <div className="contentHolder">
            <div>
                <div className="contentHeader">
                    <Label>Info</Label>
                    <RightSlot>
                        { !isKing && <ModalThroneChallenge triggerElement={
                            <Button red>
                                <Text>Challenge King</Text>
                            </Button>
                        } />}
                        {isKing && <ModalThroneUpdate triggerElement={
                            <Button red>
                                <Text>Update Throne</Text>
                            </Button>
                        } />}
                    </RightSlot>
                </div>
                
                <Flex css={{ flexDirection: "row", gap: 5, justifyContent:"space-between" }}>
                    <Flex css={{ flexDirection: "column", gap: 5 }}>
                        <Address value={king} isImageBig={true} />
                        <Flex css={{ flexDirection: "row", gap: 5 }}>
                            <Text bold>Open Challenges </Text>
                            <Text>{Object.keys(battles).length}</Text>
                        </Flex>
                        <Flex css={{ flexDirection: "row", gap: 5 }}>
                            <Text bold>Winnings</Text>
                            <AssetDisplay balance={winnings} tokenAddress = {USDC_ADDRESS_ON_NETWORKS[chainId]} />
                        </Flex>
                        <Flex css={{ flexDirection: "row", gap: 5 }}>
                            <Text bold>Games to win</Text>
                            <Text>{gamesToWin}</Text>
                        </Flex>
                        <Flex css={{ flexDirection: "row", gap: 5 }}>
                            <Text bold>Max trys</Text>
                            <Text>{maxTrys}</Text>
                        </Flex>
                        <Flex css={{ flexDirection: "row", gap: 5 }}>
                            <Text bold>Price to challenge</Text>
                            <AssetDisplay balance={price / 10 ** 18} tokenAddress = {USDC_ADDRESS_ON_NETWORKS[chainId]} />
                        </Flex>
                    </Flex>
                    <Flex css={{ flexDirection: "column", gap: 5 }}>
                        <Text bold>Open Challenges</Text>
                        <List items={battleItems} />
                    </Flex>
                </Flex>        
            </div>
            </div>
        </div>
    </div>
    );
}

const Label = styled('label', {
  fontSize: 23,
  lineHeight: 1,
  fontWeight: 500,
  marginBottom: 20,
  color: violet.violet12,
  display: 'block',
});

const LeftSlot = styled('div', {
    marginRight: 'auto',
    paddingRight: 0,
    display: 'flex',
    color: violet.violet11,
    '[data-highlighted] > &': { color: 'white' },
    '[data-disabled] &': { color: violet.violet4 },
  });

  const RightSlot = styled('div', {
    marginLeft: 'auto',
    paddingLeft: 0,
    display: 'flex',
    '[data-highlighted] > &': { color: 'white' },
  });