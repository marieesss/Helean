import React from "react";
import { Pie, Cell, PieChart, Label } from "recharts";
import "../App.css"

export default function PrecisionRoll({ R }) {
        R *= 100
        const data = [{ value: R }, { value: 100 - R }, { value: 1 }];
return (
        <PieChart width={70} height={70} class="piechart">
            <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        dataKey="value"
                        innerRadius={25}
                        outerRadius={32}
                        >
                            {data.map((entry, index) => {
                            if (index === 1 || index === 2) {
                            return <Cell key={`cell-${index}`} fill="#f3f6f9" />;
                            }
                            return <Cell key={`cell-${index}`} fill="#FD9B8E" />;
                            })}
                    <Label
                        value={data[0].value + "%"}
                        position="center"
                        fill="#456efe"
                        style={{
                        fontSize: "17px",
                        fontWeight: "bold",
                        fontFamily: "Roboto",
                        }}
            />
                </Pie>
                </PieChart>
);
}
