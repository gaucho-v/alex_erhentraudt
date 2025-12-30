import './Snowfall.css';

export const Snowfall = ({ isDisabled }: { isDisabled: boolean }) => {
    return (
        <div className={isDisabled ? "" : 'snow'}></div>
    );
};