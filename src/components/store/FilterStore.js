import { create } from 'zustand';

const useFilterStore = create((set) => ({
  FilterLabel : "",
  FilterObj: {
    NoFilter: true,
    ImportanceASC: false,
    ImportanceDEC: false,
    DateASC: false,
    DateDEC: false,
    TitleSort: false
  },
  updateFilterLabel: (label) =>set((state) =>{
    return {...state , FilterLabel: label};
  }),
  updateFilterObj: (task) => set((state) => {
    return {...state , FilterObj: task };
  })
}));

export default useFilterStore;
