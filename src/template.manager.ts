import * as fs from 'fs';
import * as path from 'path';
import * as config from './config';
import {Logger} from './logger';

/**
 * Template manager api interface.
 */
export interface ITemplateManager {
  getTemplate(name: string): Template | undefined;
}

/**
 * Template type for loading file templates
 * and template file content.
 */
export class Template {
 
  /**
   * Creates new template
   * @param name Template name.
   * @param content Template file content.
   */
  constructor(public name: string = '', public content: string = '') {
  }

  /**
   * Injects template content params by replacing {} tokens with regex.
   * @param params Template key/value pair params to inject.
   */
  public replace(params: any): string {
    let templateContent = this.content;
    Object.keys(params).map(key => {
      templateContent = templateContent.replace(RegExp(`{${key}}`, 'g'), params[key]);
    });
    return templateContent;
  }  
}

/**
 * Template manager implementation for html and json files.
 */
export class TemplateManager implements ITemplateManager {
  
  private templates: Array<Template>; // loaded templates
  private logger: Logger = new Logger('template.manager:', config.logLevel);

  /**
   * Creates new template manager and loads templates 
   * from the specified template folder.
   * @param templateFolder Template folder to inspect.
   */
  public constructor(private templateFolder: string) {
    this.templates = this.loadTemplates();
  }

  /**
   * Loads .html and .json templates from the specified template folder.
   * @param templateFolder Template folder to inspect.
   */
  private loadTemplates(): Array<Template> {
    this.logger.debug('loadTemplates(): loading file templates... templateFolder:', this.templateFolder);
    const fileNames: string[] = fs.readdirSync(this.templateFolder)
      .filter(fileName => fileName.endsWith('.html') || fileName.endsWith('.json'));
    const templates: Array<Template> = [];
    // TODO: change this to read file async ???
    fileNames.forEach(fileName => templates.push(
      new Template(fileName, fs.readFileSync(path.join(this.templateFolder, fileName), 'utf8')) // file content
    ));
    this.logger.debug('loadTemplates(): templates:', fileNames);
    return templates;
  }

  /**
   * Gets file template with the specified name.
   * @param name Template name to find.
   */
  public getTemplate(name: string): Template | undefined {
    return this.templates.find(template => template.name === name);
  }
}
