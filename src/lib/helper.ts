export const formatPrice = (amount: number, currencyCode?: string) => {
    const currencyFormatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode || 'USD',
    });
    return currencyFormatter.format(amount);
};
// export const formatPrice = (amount: number, currencyCode?: string) => {
//     const currencyFormatter = new Intl.NumberFormat(
//       currencyCode || 'en-US',
//       {
//         style: 'currency',
//       }
//     );
//     return currencyFormatter.format(amount);
//   };
  