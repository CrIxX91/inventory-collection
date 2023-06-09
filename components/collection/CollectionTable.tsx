import { Figure } from "@/interfaces";
import { Container, Grid, Table } from "@nextui-org/react";
import { FC } from "react";
import { CollectionItem } from './CollectionItem';

interface CollectionProps{
    figures: Figure[];
}

export const CollectionTable:FC<CollectionProps> = ({figures}) => {
  return (
    <Container
      css={{
        display:'flex',
        flexDirection:'column',
        paddingTop:'2em',
        // height:'calc(100vh - 60px)',
        alignItems:'center',
        alignSelf:'center',
        justifyContent:'start',
        // background:'red'
      }} 
      >
        <Table
      bordered
      shadow={false}
      color="secondary"
      aria-label="Example pagination  table"
      css={{
        height: "auto",
        minWidth: "100%",
      }}
      containerCss={
        {
            width: '80%'
        }
      }
    //   selectionMode="multiple"
    >
      <Table.Header>
        <Table.Column>NAME</Table.Column>
        <Table.Column>ROLE</Table.Column>
        <Table.Column>STATUS</Table.Column>
      </Table.Header>
      <Table.Body>
        <Table.Row key="1">
          <Table.Cell>Tony Reichert</Table.Cell>
          <Table.Cell>CEO</Table.Cell>
          <Table.Cell>Active</Table.Cell>
        </Table.Row>
        <Table.Row key="2">
          <Table.Cell>Zoey Lang</Table.Cell>
          <Table.Cell>Technical Lead</Table.Cell>
          <Table.Cell>Paused</Table.Cell>
        </Table.Row>
        <Table.Row key="3">
          <Table.Cell>Jane Fisher</Table.Cell>
          <Table.Cell>Senior Developer</Table.Cell>
          <Table.Cell>Active</Table.Cell>
        </Table.Row>
        <Table.Row key="4">
          <Table.Cell>William Howard</Table.Cell>
          <Table.Cell>Community Manager</Table.Cell>
          <Table.Cell>Vacation</Table.Cell>
        </Table.Row>
        <Table.Row key="5">
          <Table.Cell>Jane Fisher</Table.Cell>
          <Table.Cell>Senior Developer</Table.Cell>
          <Table.Cell>Active</Table.Cell>
        </Table.Row>
        <Table.Row key="6">
          <Table.Cell>Zoey Lang</Table.Cell>
          <Table.Cell>Technical Lead</Table.Cell>
          <Table.Cell>Paused</Table.Cell>
        </Table.Row>
        <Table.Row key="7">
          <Table.Cell>Jane Fisher</Table.Cell>
          <Table.Cell>Senior Developer</Table.Cell>
          <Table.Cell>Active</Table.Cell>
        </Table.Row>
        <Table.Row key="8">
          <Table.Cell>William Howard</Table.Cell>
          <Table.Cell>Community Manager</Table.Cell>
          <Table.Cell>Vacation</Table.Cell>
        </Table.Row>
      </Table.Body>
      <Table.Pagination
        shadow
        noMargin
        align="center"
        rowsPerPage={3}
        onPageChange={(page) => console.log({ page })}
      />
    </Table>

    </Container>
  )
}
