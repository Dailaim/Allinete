import type { JSXNode, QRL, QwikTouchEvent} from "@builder.io/qwik";
import { Slot, component$, createContextId, useContext, useContextProvider, useStore, useTask$, useVisibleTask$ } from "@builder.io/qwik";
import { useMenuTouch } from "./useMenuTouch";

export type navbarContext = {
  customsBottoms?: QRL<(()=>JSXNode)> | null;
  openMenu : boolean;
  openCart : boolean;
  openSearch : boolean;
  isOpen : boolean;
  openCustoms : boolean;
  touchHandler : {
    start : QRL<(this: navbarContext, e: QwikTouchEvent) => void>;
    move : QRL<(this: navbarContext, e: QwikTouchEvent) => void>;
    end : QRL<(this: navbarContext, e: QwikTouchEvent) => void>;
  }
  isTouchNavbar : boolean;
};



export const navbarContext = createContextId<navbarContext>("navbar-context");

export const useNavbarContext = () => {
  return useContext(navbarContext);
}



export const NavbarProvider = component$(() => {

  const store = useStore<navbarContext>({
    customsBottoms: null,
    openMenu : false,
    openCart : false,
    openSearch : false,
    openCustoms : false,
    touchHandler: {} as any,
    isOpen : false,
    isTouchNavbar: false
  },{
    deep: true
  });
  

  const touchHandlers = useMenuTouch(store);

  useTask$(()=>{
    store.touchHandler = touchHandlers;
  })

  useVisibleTask$(({track})=>{
    track(()=> store.openMenu || store.openCart || store.openSearch || store.openCustoms)
    store.isOpen =  store.openMenu || store.openCart || store.openSearch || store.openCustoms
  })

  useVisibleTask$(({track})=>{
    track(()=> store.isOpen)
    console.log(store.isOpen)

    if (store.isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100vh";
    }

    if (!store.isOpen) {
      document.body.style.overflow = "auto";
      document.body.style.height = "auto";
    }

  })



  useContextProvider(navbarContext, store);
  

  return <Slot/>
})



