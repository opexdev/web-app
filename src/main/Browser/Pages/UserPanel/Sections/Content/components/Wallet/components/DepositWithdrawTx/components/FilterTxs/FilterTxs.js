import classes from "../../DepositWithdrawTx.module.css";
import NumberInput from "../../../../../../../../../../../../components/NumberInput/NumberInput";
import TextInput from "../../../../../../../../../../../../components/TextInput/TextInput";
import React, {useState} from "react";

const FilterTxs = () => {

    const [filterOpen, setFilterOpen] = useState(null);
    const [alert, setAlert] = useState({
        fromTime: null,
        fromDate: null,
        toTime: null,
        toDate: null,
    });
    const [filters, setFilters] = useState({
        fromTime: null,
        fromDate: null,
        toTime: null,
        toDate: null,
        type: null,
        address: null,
    });
    function timeValidator(inputField, key) {
        const isValid = /^(2[0-3]|[01]?[0-9]):([0-5]?[0-9])$/.test(inputField);
        if (isValid) {
            setAlert({...alert, [key]: null});
            setFilters({...filters, [key]: inputField});
        } else {
            setAlert({...alert, [key]: "ساعت وارد شده صحیح نمیباشد"});
        }
    }

    function dateValidator(inputField, key) {
        const isValid = /^[1-4]\d{3}\/((0[1-6]\/((3[0-1])|([1-2][0-9])|(0[1-9])))|((1[0-2]|(0[7-9]))\/(30|31|([1-2][0-9])|(0[1-9]))))$/.test(
            inputField,
        );
        if (isValid) {
            setAlert({...alert, [key]: null});
        } else {
            setAlert({...alert, [key]: "تاریخ وارد شده صحیح نمیباشد"});
        }
    }

    const options = [
        {value: "all", label: "همه"},
        {value: "deposit", label: "واریز"},
        {value: "withdraw", label: "برداشت"},
    ];

    return <>
        <div className={classes.filterBox}>
            <NumberInput
                lead="از ساعت"
                after=<i className="icon-clock"/>
            customClass={classes.filterInput}
            format="##:##"
            placeholder="HH:mm"
            mask={["H", "H", "m", "m"]}
            alert={alert.fromTime}
            onchange={(input) =>
            timeValidator(input.target.value, "fromTime")
        }
            />
            <NumberInput
                lead="تاریخ"
                after=<i className="icon-calendar-1"/>
            customClass={classes.filterInput}
            format="####/##/##"
            placeholder="YYYY/MM/DD"
            mask={["Y", "Y", "Y", "Y", "M", "M", "D", "D"]}
            alert={alert.fromDate}
            onchange={(input) =>
            dateValidator(input.target.value, "fromDate")
        }
            />
            <NumberInput
                lead="تا ساعت"
                after=<i className="icon-clock"/>
            customClass={classes.filterInput}
            format="##:##"
            placeholder="HH:mm"
            mask={["H", "H", "m", "m"]}
            alert={alert.toTime}
            onchange={(input) =>
            timeValidator(input.target.value, "toTime")
        }
            />
            <NumberInput
                lead="تاریخ"
                after=<i className="icon-calendar-1"/>
            customClass={classes.filterInput}
            format="####/##/##"
            placeholder="YYYY/MM/DD"
            mask={["Y", "Y", "Y", "Y", "M", "M", "D", "D"]}
            alert={alert.toDate}
            onchange={(input) =>
            dateValidator(input.target.value, "toDate")
        }
            />
        </div>
        <div className={classes.filterBox}>
            <TextInput
                select={true}
                placeholder="نوع تراکنش"
                options={options}
                value={filters.type}
                lead="نوع تراکنش"
                customClass={classes.filterInput}
                onchange={(e) => setFilters({...filters, type: e.value})}
            />
            <TextInput
                placeholder=" آدرس مبدا/مقصد را وارد کنید"
                options={options}
                value={filters.address}
                lead="مبدا/مقصد"
                customClass={`${classes.filterInput} ${classes.address}`}
                onchange={(e) =>
                    setFilters({...filters, address: e.target.value})
                }
            />
        </div>
        <div className={classes.btnBox}>
            <button
                className={`${classes.button} ${classes.submit} cursor-pointer`}
                onClick={() => setFilterOpen((prev) => !prev)}>
                اعمال فیلتر
            </button>
            <button
                className={`${classes.button} ${classes.reset} cursor-pointer`}
                onClick={() => setFilterOpen((prev) => !prev)}>
                حذف فیلتر
            </button>
            <button
                className={`${classes.button} ${classes.return} cursor-pointer`}
                onClick={() => setFilterOpen((prev) => !prev)}>
                بازگشت
            </button>
        </div>
    </>
}
export default FilterTxs;