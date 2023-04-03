import { Figure } from "@/interfaces";
import { Grid } from "@nextui-org/react";
import { FC, Fragment } from "react";
import { CollectionItem } from './CollectionItem';

interface CollectionProps{
    figures: Figure[];
}

export const CollectionList:FC<CollectionProps> = ({figures}) => {
  return (
    <Fragment>
        <Grid.Container gap={4} direction='row' justify="center" css={{paddingTop:'2em'}}>
            {
                figures.map(fig=>(
                    <CollectionItem  figure={fig} key={fig._id}/>
                ))
            }
        </Grid.Container>
    </Fragment>
    
  )
}
