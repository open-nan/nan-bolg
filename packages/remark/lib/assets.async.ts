const assetsQueue:(Promise<void>)[] = []


export function addAssets(asyncFun: Promise<void>){
  assetsQueue.push(asyncFun)
}

export async function compileAssets(){
  await Promise.all(assetsQueue)
}