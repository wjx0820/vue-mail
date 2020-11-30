import { onBeforeUnmount } from "vue";

export const useKeydown = function(keyCombos) {
  let onkey = function(event) {
    let kc = keyCombos.find(({ key }) => key == event.key);
    if (kc) {
      kc.fn();
    }
  };

  window.addEventListener("keydown", onkey);

  onBeforeUnmount(() => {
    window.removeEventListener("keydown", onkey);
  });
};

export default useKeydown;
