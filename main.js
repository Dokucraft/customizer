// Right now, 1.19 is the only customizer, so just run that
import 'customizers/1.19'

/*
  If more customizers need to be added later, use dynamic imports
  instead. For example, something like this can be done:

  await import(({
    '1.19': 'customizers/1.19',
    '1.21': 'customizers/1.21',
    '1.22': 'customizers/1.22',
  })[Customizer.id])
*/
