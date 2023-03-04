import * as React from "react";
import { Text, Card } from "@nextui-org/react";
export default (props) => {
  const { secondsLeft, isActive } = props;
  const mmHhSs = new Date(secondsLeft * 1000).toISOString().slice(11, 19);

  return (
    <Card
      css={
        isActive
          ? { backgroundColor: "Green", width: "250px" }
          : { backgroundColor: "Gray", width: "250px" }
      }
    >
      <Text h1>{mmHhSs}</Text>
    </Card>
  );
};
