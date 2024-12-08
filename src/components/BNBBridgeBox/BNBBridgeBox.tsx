import React from "react";
import styled from "styled-components";
import { Box, Flex } from "components/Box";
import { Text } from "components/Text";
import { OpenNewIcon } from "components/Svg";
import { NextLinkFromReactRouter } from "components/NextLink";

const Container = styled(Flex)`
  width: 100%;
  max-width: 464px;
  height: 64px;
  border-radius: 16px;
  background-color: #eab20033;
  justify-content: space-between;
  align-items: center;
  :hover,
  :focus {
    opacity: 0.9;
  };
  :active {
    opacity: 0.8;
  };
`

const BNBBridgeBox = () => {
  return (
		// <Flex justifyContent="center" mt="10px">
		// 	<Container
		// 		as={NextLinkFromReactRouter}
		// 		to='https://cbridge.celer.network/1/56/'
		// 		target='_blink'
		// 		p="12px"
		// 	>
		// 		<Flex alignItems="center">
		// 			<img 
		// 				src='/images/bnbBridge.png' 
		// 				width="40px" 
		// 				height="40px" 
		// 				alt="bridgeIcon" 
		// 				style={{borderRadius: "12px"}}
		// 			/>
		// 			<Box ml="10px">
		// 				<Text fontSize="16px" lineHeight="1.2" color="primaryDark">BNB Chain token bridge</Text>
		// 				<Text fontSize="14px" lineHeight="1.2" color="primaryDark">Deposit tokens to the BNB Chain network.</Text>
		// 			</Box>
		// 		</Flex>
		// 		<Flex mr="10px">
		// 			<OpenNewIcon color="primaryDark" />
		// 		</Flex>
		// 	</Container>
		// </Flex>
		<></>
  );
};

export default BNBBridgeBox;
