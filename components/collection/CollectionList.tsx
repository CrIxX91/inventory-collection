import { Figure } from "@/interfaces";
import { Grid } from "@nextui-org/react";
import { FC } from "react";
import { CollectionItem } from './CollectionItem';

interface CollectionProps{
    figures: Figure[];
}

export const CollectionList:FC<CollectionProps> = ({figures}) => {
  return (
    <Grid.Container gap={2} direction='row' justify="center" css={{paddingTop:'2em'}}>
        {
            figures.map(fig=>(
                <CollectionItem  figure={fig} key={fig._id}/>
            ))
        }
    </Grid.Container>
  )
}
