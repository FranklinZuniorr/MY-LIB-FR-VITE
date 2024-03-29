import { Radio } from "antd";
import Section from "../areas/_section/Section";
import Title from "../texts/_title/Title";
import { useState } from "react";
import styled from "styled-components";

interface IOption {
    key: string;
    value: string;
    text: string;
}

interface IRadioOptionsProps{
    options: IOption[];
    onChange: (data: string) => void;
    marginTop?: number;
    marginBottom?: number;
    marginLeft?: number;
    marginRight?: number;
    position?: "flex-start" | "center" | "flex-end";
    value?: string;
    name?: string;
}

const Div = styled.div`
.area-1{
    display: flex;
    gap: 1rem !important;
    flex-wrap: wrap;
    
    .item{
        display: flex;
    }
}
`;

const RadioOptions: React.FC<IRadioOptionsProps> = ({
    marginBottom = 0,
    marginTop = 0,
    marginLeft = 0,
    marginRight = 0,
    onChange = () => null,
    options,
    position = "flex-start",
    value,
    name = ""
}) => {

    const [valueRadio, setValueRadio] = useState<any>("");

    return(
        <>
            <Div style={{
                marginBottom: `${marginBottom}rem`,
                marginTop: `${marginTop}rem`,
                marginLeft: `${marginLeft}rem`,
                marginRight: `${marginRight}rem`,
            }}>
                <Radio.Group name={name} onChange={(event) => {
                    onChange(event.target.value);
                    setValueRadio(event.target.value);
                }} value={
                    value? value:valueRadio
                }>
                    <div className={"area-1"} style={{
                        justifyContent: position
                    }}>
                        {
                            options.map((radio: IOption, index:number) => (
                                <Section 
                                key={index}
                                marginLeft={0} marginTop={0} marginBottom={0} marginRight={0.5}
                                fluid={false} resizeAdjust={false} shadow={false} border={{color: "#ACACAC", size: 1, radius: 15}}
                                >
                                    <div className={"item"}>
                                        <Radio value={radio.value}/>
                                        <Title marginLeft={0.5} text={radio.text} size={14} color="#707070"/>
                                    </div>
                                </Section>
                            ))
                        }
                    </div>
                </Radio.Group>
            </Div>
        </>
    )
}

export default RadioOptions;