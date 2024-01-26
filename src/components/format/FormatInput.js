import CurrencyInput from 'react-currency-input-field';
import style from './FormatInput.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(style);

function FormatInput({ className, name, value, methodOnchange }) {
    return (
        <CurrencyInput
            className={cx('format-input', className)}
            name={name}
            value={value}
            onValueChange={methodOnchange}
            decimalsLimit={5}
            groupSeparator="."
            decimalSeparator=","
        />
    );
}

export default FormatInput;
