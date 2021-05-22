export const MyCustomToast = ({ appearance, children }) => (
    <div style={{ background: appearance === 'error' ? 'red' : 'var(--bgGreen)' }}>
        {children}
    </div>
);
