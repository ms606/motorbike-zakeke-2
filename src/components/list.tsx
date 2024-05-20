import styled from "styled-components";

export const List = styled.div`
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    // flex-wrap:wrap;
`;

export const ListItem = styled.div<{ selected?: boolean }>`
     display: flex;
     flex-direction: column;
     justify-content: flex-start;
     align-items: center;
    //  padding: 8px 1px 1px 1px;
     border-radius: 16px;
     margin-bottom: 12px;
     margin-right: 6px;
     cursor: pointer;
       @media screen and (max-width: 568px) {
         font-size: 24px;
       }
    
`;

    export const ListItemImage = styled.img<{big?: any}>`
    width: ${props => props.big ? '88px' : '68px' };
    height: ${props => props.big ? '88px' : '67px' };
      background-size: contain;
      background-position: 50%;
      background-repeat: no-repeat;
      position: relative;
        @media screen and (max-width: 1013px) {
          width: 60px;
          height: 60px;
        }
        @media screen and (max-width: 913px) {
          width: 53px;
          height: 53px;
        }
        @media screen and (max-width: 842px) {
          width: 50px;
          height: 50px;
        }
        @media screen and (max-width: 792px) {
          width: 45px;
          height: 45px;
        }
        @media screen and (max-width: 568px) {
            width: 53px;
            height: 57px;
            margin: 0px 4px;

    `


    export const ListItemColor = styled.li<{ selected?: boolean, selectedColor?: any, big?: any}>`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    justify-content: center;
    padding: 0px 10px;
    cursor: pointer;
    margin: 0 11px;
    border-radius: 100%;
    width: ${props => props.big ? '88px' : '36px' };
    height: ${props => props.big ? '88px' : '36px' };
    white-space: nowrap;  
    font-size: 12px;  
    border-color: ${props => props.selected ? 'black' : '#DDD'};

    &:hover {
        background-color: #D8D8D8;
    };
    
    &:before {
        content: '';
        position: absolute;
        bottom: 20%;
        /* Additional styling for the :before pseudo-element can be added here */
    };

    &:after {
    // content: "${props => { return props.selected ? props.selectedColor : '' }}";
    position: absolute;
    bottom: 7%;
    }
        
    @media screen and (max-width: 568px) {
    &:after {
     bottom: -65%;  
     }
    }`;
 
    


export const ListItemImageNoCarousel = styled.img<{ selected?: any }>`
position: relative;
width: 40px;
height: 40px;
object-fit: contain;
margin: 0px 11px;
border-radius: 100%;
border: 1px solid rgb(229, 229, 229);

@media screen and (max-width: 568px) {
width: 30px;
height: 30px;
margin: 0px 8px;
}
`