import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import Router from "next/router";
import { Fragment, ReactNode } from "react";
import { MenuSubItem } from "types";

export function MenuItem({
  children,
  link,
  subItems = [],
}: {
  children: ReactNode;
  link?: string;
  subItems?: MenuSubItem[];
}) {
  return (
    <AccordionItem>
      <AccordionButton onClick={link ? () => Router.push(link) : undefined}>
        <Box flex="1" textAlign="left">
          {children}
        </Box>
        {subItems.length ? <AccordionIcon /> : null}
      </AccordionButton>

      {subItems.length ? (
        <AccordionPanel border={"0px solid transparent"} pb="0">
          {subItems.map(({ name, onClick, condition }, index) => {
            const item = (
              <AccordionItem>
                <AccordionButton onClick={onClick}>{name}</AccordionButton>
              </AccordionItem>
            );
            return (
              <Fragment key={`${name}-${index}`}>
                {condition === undefined ? (
                  <>{item}</>
                ) : (
                  condition && <>{item}</>
                )}
              </Fragment>
            );
          })}
        </AccordionPanel>
      ) : null}
    </AccordionItem>
  );
}
