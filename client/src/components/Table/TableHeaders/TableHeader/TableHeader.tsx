import React, {useState} from "react";
import classNames from "classnames";

import "./TableHeader.scss";


interface Props {
    header: string,
    handleSort?: (header: string, sortState: string) => void,
    isSortable?: boolean
}

const STATES = ["original", "ascending", "descending"];

export const TableHeader = ({header, handleSort, isSortable = false}: Props) => {
    const [stateCounter, setStateCounter] = useState(0);
    return (
        <th className="table__header">
            <div
                className={classNames(
                    "header-container",
                    isSortable && "header-container--sortable"
                )}
            >
                {header}
                {isSortable && (
                    <button
                        onClick={() => {
                            let counter = stateCounter + 1;
                            if(counter === 3) counter = 0;
                            handleSort !== undefined && handleSort(header, STATES[counter]);
                            setStateCounter(counter);
                        }}
                        className="header-container__button"
                    >
                        <svg
                            className="header-container__icon"
                            width="17"
                            height="17"
                            viewBox="0 0 17 17"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M4.65132 7.83334H12.3493C12.924 7.83334 13.2293 7.15335 12.8473 6.72335L8.99865 2.39335C8.93622 2.32288 8.85955 2.26647 8.7737 2.22783C8.68786 2.1892 8.59479 2.16922 8.50065 2.16922C8.40651 2.16922 8.31344 2.1892 8.22759 2.22783C8.14175 2.26647 8.06508 2.32288 8.00265 2.39335L4.15265 6.72335C3.77065 7.15335 4.07598 7.83334 4.65132 7.83334ZM8.00198 14.606C8.06441 14.6765 8.14108 14.7329 8.22693 14.7715C8.31277 14.8102 8.40584 14.8301 8.49998 14.8301C8.59412 14.8301 8.68719 14.8102 8.77304 14.7715C8.85888 14.7329 8.93555 14.6765 8.99798 14.606L12.8466 10.276C13.2293 9.84668 12.924 9.16668 12.3486 9.16668H4.65132C4.07665 9.16668 3.77132 9.84668 4.15332 10.2767L8.00198 14.606Z" fill="currentColor"/>
                        </svg>
                    </button>
                )}
            </div>
        </th>
    )
}