type variant = "avator" | "public" ;

interface ConfigType{
  variant: variant; 
  id: any;
}
export default function cfUrl ( {id, variant} :ConfigType) { 
  return `https://imagedelivery.net/SBbaUMdyQjsm6dK7i34s7g/${id}/${variant}`

 }