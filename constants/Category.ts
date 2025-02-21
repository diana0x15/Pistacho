export default interface Category {
  id: string;
  name: string;
  image: string;
  colors: {
    accent: string;
    gradient_start: string;
    gradient_end: string;
  };
}
