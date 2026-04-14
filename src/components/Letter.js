
export const Letter = ({value, color}) => <div className={`letter__container ${color? `color-${color}` : '' } ${value? '' : 'empty'}`}>
    <span className={'letter__text'}>{value}</span>
</div>