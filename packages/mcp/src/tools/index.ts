// ============================================================================
// VedUI MCP Tools - Index
// Registers all 16 tools for AI-native UI development
// ============================================================================

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import type { Registry } from 'vayu-ui-registry';

// Discovery Tools
import { register as registerSearchComponents } from './search_components.js';
import { register as registerListComponents } from './list_components.js';

// Component Info Tools
import { register as registerGetComponentSpec } from './get_component_spec.js';
import { register as registerGetComponentExamples } from './get_component_examples.js';
import { register as registerGetComponentRules } from './get_component_rules.js';
import { register as registerGetCompositionPattern } from './get_composition_pattern.js';
import { register as registerSuggestComponentStack } from './suggest_component_stack.js';
import { register as registerGetDesignTokens } from './get_design_tokens.js';
import { register as registerGetDesignRules } from './get_design_rules.js';

// Modification Tools
import { register as registerModifyComponentVariant } from './modify_component_variant.js';
import { register as registerModifyComponentStructure } from './modify_component_structure.js';
import { register as registerModifyComponentProps } from './modify_component_props.js';
import { register as registerEnhanceComponentBehavior } from './enhance_component_behavior.js';
import { register as registerApplyResponsiveLayout } from './apply_responsive_layout.js';

// Validation Tools
import { register as registerValidateUiCode } from './validate_ui_code.js';
import { register as registerFixUiCode } from './fix_ui_code.js';

/**
 * Register all 16 MCP tools
 */
export function registerAllTools(server: McpServer, registry: Registry): void {
  // Discovery Tools
  registerSearchComponents(server, registry);
  registerListComponents(server, registry);

  // Component Info Tools
  registerGetComponentSpec(server, registry);
  registerGetComponentExamples(server, registry);
  registerGetComponentRules(server, registry);
  registerGetCompositionPattern(server, registry);
  registerSuggestComponentStack(server, registry);
  registerGetDesignTokens(server, registry);
  registerGetDesignRules(server, registry);

  // Modification Tools
  registerModifyComponentVariant(server, registry);
  registerModifyComponentStructure(server, registry);
  registerModifyComponentProps(server, registry);
  registerEnhanceComponentBehavior(server, registry);
  registerApplyResponsiveLayout(server, registry);

  // Validation Tools
  registerValidateUiCode(server, registry);
  registerFixUiCode(server, registry);
}
