import { List, Card, Tag, Icon } from "antd";
import React from 'react';
import Meta from "antd/lib/card/Meta";

const CardsList: React.FC<any> = ({ data }: any) => {

  const petSizes: Record<string, string> = {
    S: "Small",
    M:"Medium",
    L: "Large",
    XL: "Extra Large"
  };
  
  return (
    <List
    grid={{
      gutter: 5,
      xs: 1,
      sm: 2,
      md: 2,
      lg: 2,
      xl: 3,
      xxl: 3,
    }}
    dataSource={data}
    renderItem={(pet:any) => (
      <List.Item>
        <Card
           hoverable
           style={{ width: 240, marginTop: 16 }} 
          title={pet.name}
          extra={
            <span>
              <Tag color={pet.status_key === "AVAILABLE" ? "green" : "red"}>
                {pet.status_key}
              </Tag>
              <Tag color={pet.sex_key === "MALE" ? "blue" : "pink"}>
                <Icon type={pet.sex_key === "MALE" ? "man" : "woman"}/>
              </Tag>
            </span>
          }
        >
          <Meta 
            description={
              `${pet.name} is a special ${pet.specie.name.toLowerCase()} ${pet.age_key.toLowerCase()} 
              ${pet.sex_key.toLowerCase()} of ${petSizes[pet.size_key].toLowerCase()} size. 
              ${pet.sex_key === 'MALE' ? 'He' : 'She'} can be yours for the small price of $${pet.price}`
            }
          />          
        </Card>
      </List.Item>
    )}
  />
  )
}

export default CardsList;
