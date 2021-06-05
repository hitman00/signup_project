export default function (context) {
  const t = context.$storage.getUniversal('data')
  if (!t) {
    context.redirect('./')
  }
}
