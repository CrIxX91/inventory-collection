import { Figure } from "@/interfaces"
import { BrandLogos, formatter } from "@/utils";
import { Avatar, Button, Card, Col, Grid, Row, Spacer, Text } from "@nextui-org/react";
import { FC } from "react";

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
    
   

  return (
        <Grid xl={2} lg={2} md={3} sm={3} xs={6}  key={_id} >
          
        <Card isHoverable isPressable 
            css={{ w: "100%", h: "360px", 
                  backgroundImage:`url(${figure.thumbpath})`,
                  backgroundPosition:'center',
                  backgroundRepeat:'no-repeat',
                  backgroundSize:'cover',

            }} >
            <Card.Body css={{ p: 0 }}>
            </Card.Body>
           
            <Card.Footer
                isBlurred
                css={{
                  position: "absolute",
                  bgBlur: "#0f111466",
                  borderTop: "$borderWeights$light solid $gray800",
                  bottom: 0,
                  zIndex: 1,
                  display:'flex',
                  flexDirection:'column'
                }}
            >
          <Col>
          <Row>
          
            <Col span={12}>
              <Text color="white" css={{ fontWeight: "$semibold", fontSize: "$md" }}>
              {name}
              </Text>
              <Text color="#d1d1d1" size={12}>
              Quantity: {quantity}
              </Text>
            </Col>
          </Row>
          </Col>
          <Col >
          <Row justify="flex-end">
          <Text
                css={{ color: "inherit"}}
                size={12}
                weight="bold"
                transform="uppercase"
              >
                 {formatter.format(price)}
              </Text>
          </Row>
          </Col>
       
     
            </Card.Footer>
            <Avatar
                size="lg"
                src={getLogo(brand)}
                color="gradient"
                bordered
                squared
                css={{
                  position:'absolute',
                  bottom:'70px',
                  right:'10px',
                  zIndex:'3'
                }}
              />
        </Card> 
    </Grid>
  )
}
