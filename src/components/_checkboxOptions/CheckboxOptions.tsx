import { Checkbox } from "antd";
import Section from "../areas/_section/Section";
import styles from "./CheckboxOptions.module.scss";
import Title from "../texts/_title/Title";
import { useState } from "react";

interface IOption {
    key: string;
    value: any;
    text: string;
    img?: string;
    disabled?: boolean;
}

interface IOnChangeOption {
    option: string,
    checked: boolean
}

interface ICheckboxOptionsProps{
    options: IOption[];
    onChange: (data: any[]) => void;
    onChangeOption?: (data: IOnChangeOption) => void;
    marginTop?: number;
    marginBottom?: number;
    marginLeft?: number;
    marginRight?: number;
    position?: "flex-start" | "center" | "flex-end";
    value?: any[];
    name?: string;
    checkboxPosition?: "row" | "row-reverse"
}

const CheckboxOptions: React.FC<ICheckboxOptionsProps> = ({
    marginBottom = 0,
    marginTop = 0,
    marginLeft = 0,
    marginRight = 0,
    onChange = () => null,
    options,
    position = "flex-start",
    value,
    name = "",
    checkboxPosition = "row",
    onChangeOption = () => null
}) => {

    const [valueCheckbox, setValueCheckbox] = useState<any[]>([]);

    return(
        <>
            <div className={styles["checkbox-options"]} style={{
                marginBottom: `${marginBottom}rem`,
                marginTop: `${marginTop}rem`,
                marginLeft: `${marginLeft}rem`,
                marginRight: `${marginRight}rem`,
            }}>
                <Checkbox.Group name={name} onChange={(event) => {
                    onChange(event);
                    setValueCheckbox(event);
                }}  value={
                    value? value:valueCheckbox
                }>
                    <div className={styles["area-1"]} style={{
                        justifyContent: position
                    }}>
                        {
                            options.map((checkbox: IOption, index:number) => (
                                <Section 
                                key={index}
                                marginLeft={0} marginTop={0} marginBottom={0} marginRight={0.5}
                                fluid={false} 
                                resizeAdjust={false} 
                                shadow={false} 
                                border={{color: checkbox.disabled? "#e0457b":"#ACACAC", size: 1, radius: 15}}
                                >
                                    <div className={styles["area-elements"]}>
                                        {
                                            checkbox.img &&
                                            <img src={checkbox.img} alt="icon-card-money"/>
                                        }
                                        <div id={styles["item"]} className={
                                            checkboxPosition ===  "row"? 
                                            styles["row"]:styles["row-reverse"]
                                        }>
                                            <Checkbox disabled={checkbox.disabled} onChange={(event) => {
                                                if(event.target.checked){
                                                    onChangeOption({option: event.target.value, checked: event.target.checked})
                                                }else{
                                                    onChangeOption({option: event.target.value, checked: event.target.checked})
                                                }
                                            }} value={checkbox.value}/>
                                            {
                                                checkboxPosition ===  "row"? 
                                                <Title marginLeft={0.5} text={checkbox.text} size={14} color="#707070"/>:
                                                <Title marginRight={0.5} text={checkbox.text} size={14} color="#707070"/>
                                            }
                                        </div>
                                    </div>
                                </Section>
                            ))
                        }
                    </div>
                </Checkbox.Group>
            </div>
        </>
    )
}

export default CheckboxOptions;