import { Figure } from "@/interfaces"
import { BrandLogos } from "@/utils";
import { Card, Col, Grid, Row, Text } from "@nextui-org/react";
import { FC } from "react"

interface CollectionItemProps{
    figure:Figure;
}

export const CollectionItem:FC<CollectionItemProps>  = ({figure}) => {

    const {brand,name,quantity,price,_id} = figure;

    const getLogo = (field:string)=>{
        
        let logosrc='';
        
        const path = BrandLogos[field as keyof typeof BrandLogos];

        if(path)
            return path
        return logosrc
    }
    
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      
        // These options are needed to round to whole numbers if that's what you want.
        //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    });

  return (
    // <Grid xs={6} sm={3} md={2} xl={8} key={_id} >
        <Grid xl={8} xs={10}  key={_id} >
        <Card isHoverable isPressable css={{ w: "100%", h: "135px" }}>
            {/* <Text>{name}</Text> */}
            <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
                <Col>
                    {/* <Text size={12} weight="bold" transform="uppercase" color="#9E9E9E">
                    Your day your way
                    </Text> */}
                    <Text h3 color="white">
                    {name}
                    </Text>
                </Col>
            </Card.Header>
            <Card.Body css={{ p: 0 }}>
                <Row wrap="wrap" justify="flex-end" align="center">
                
                <Card.Image 
                    src={getLogo(brand)} 
                    height={80}
                    width={80}
                    alt={name}
                    containerCss={{
                        width: '80px',
                        maxWidth:'80px',
                        margin:'0'
                    }}
                />    
                </Row>
                
            </Card.Body>
           
            <Card.Footer
                isBlurred
                css={{
                  position: "absolute",
                  bgBlur: "#0f111466",
                  borderTop: "$borderWeights$light solid $gray800",
                  bottom: 0,
                  zIndex: 1,
                  paddingLeft:'2em',
                  paddingRight:'1em',
                }}
            >
              <Row wrap="wrap" justify="space-between" align="center">
              <Text b>Quantity: {quantity}</Text>
                <Text css={{ color: "$purple800", fontWeight: "$semibold", fontSize: "$xl" }}>
                  {formatter.format(price)}
                </Text>
              </Row>
            </Card.Footer>
        </Card> 
    </Grid>
  )
}
